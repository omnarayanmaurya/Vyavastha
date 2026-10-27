import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";

// Create an Inngest client
export const inngest = new Inngest({
    id: "vyavastha",
});

// ==========================================
// USER FUNCTIONS
// ==========================================

// Sync newly created Clerk users to the database
const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
        triggers: [{ event: "clerk/user.created" }],
    },
    async ({ event }) => {
        const { data } = event;

        await prisma.user.create({
            data: {
                id: data.id,
                email: data.email_addresses?.[0]?.email_address,
                name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
                image: data.image_url,
            },
        });
    }
);

// Delete users from the database when deleted in Clerk
const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-from-clerk",
        triggers: [{ event: "clerk/user.deleted" }],
    },
    async ({ event }) => {
        const { data } = event;

        if (!data.id) return;

        await prisma.user.deleteMany({
            where: {
                id: data.id,
            },
        });
    }
);

// Update users when their Clerk profiles change
const syncUserUpdation = inngest.createFunction(
    {
        id: "update-user-from-clerk",
        triggers: [{ event: "clerk/user.updated" }],
    },
    async ({ event }) => {
        const { data } = event;

        if (!data.id) return;

        await prisma.user.updateMany({
            where: {
                id: data.id,
            },
            data: {
                email: data.email_addresses?.[0]?.email_address,
                name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
                image: data.image_url,
            },
        });
    }
);

// ==========================================
// WORKSPACE FUNCTIONS
// ==========================================

// Create a workspace when a Clerk organization is created
const syncWorkspaceCreation = inngest.createFunction(
    {
        id: "sync-workspace-from-clerk",
        triggers: [{ event: "clerk/organization.created" }],
    },
    async ({ event }) => {
        const { data } = event;

        await prisma.workspace.upsert({
            where: {
                id: data.id,
            },
            update: {
                name: data.name,
                slug: data.slug,
                imageUrl: data.image_url,
            },
            create: {
                id: data.id,
                name: data.name,
                slug: data.slug,
                ownerId: data.created_by,
                imageUrl: data.image_url,
            },
        });

        // Add the creator as an admin member if the user exists
        if (data.created_by) {
            await prisma.workspaceMember.upsert({
                where: {
                    userId_workspaceId: {
                        userId: data.created_by,
                        workspaceId: data.id,
                    },
                },
                update: {
                    role: "ADMIN",
                },
                create: {
                    userId: data.created_by,
                    workspaceId: data.id,
                    role: "ADMIN",
                },
            });
        }
    }
);

// Update workspace data when a Clerk organization is updated
const syncWorkspaceUpdation = inngest.createFunction(
    {
        id: "update-workspace-from-clerk",
        triggers: [{ event: "clerk/organization.updated" }],
    },
    async ({ event }) => {
        const { data } = event;

        if (!data.id) return;

        await prisma.workspace.updateMany({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                slug: data.slug,
                imageUrl: data.image_url,
            },
        });
    }
);

// Delete workspace data when a Clerk organization is deleted
const syncWorkspaceDeletion = inngest.createFunction(
    {
        id: "delete-workspace-from-clerk",
        triggers: [{ event: "clerk/organization.deleted" }],
    },
    async ({ event }) => {
        const { data } = event;

        if (!data.id) return;

        await prisma.workspace.deleteMany({
            where: {
                id: data.id,
            },
        });
    }
);

// ==========================================
// WORKSPACE MEMBER FUNCTIONS
// ==========================================

// Save workspace member data when a user joins a Clerk organization
const syncWorkspaceMemberCreation = inngest.createFunction(
    {
        id: "sync-workspace-member-from-clerk",
        triggers: [
            { event: "clerk/organizationMembership.created" },
        ],
    },
    async ({ event }) => {
        const { data } = event;

        const userId = data.public_user_data?.user_id;
        const workspaceId = data.organization?.id;

        if (!userId || !workspaceId) {
            throw new Error(
                "Missing user ID or organization ID in Clerk membership event"
            );
        }

        await prisma.workspaceMember.upsert({
            where: {
                userId_workspaceId: {
                    userId,
                    workspaceId,
                },
            },
            update: {
                role: data.role === "org:admin" ? "ADMIN" : "MEMBER",
            },
            create: {
                userId,
                workspaceId,
                role: data.role === "org:admin" ? "ADMIN" : "MEMBER",
            },
        });
    }
);

// ==========================================
// EXPORT ALL INNGEST FUNCTIONS
// ==========================================

export const functions = [
    // User functions
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,

    // Workspace functions
    syncWorkspaceCreation,
    syncWorkspaceUpdation,
    syncWorkspaceDeletion,

    // Workspace member functions
    syncWorkspaceMemberCreation,
];

