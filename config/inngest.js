import { Inngest } from "inngest";
import connDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Capit-Store" });

// Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connDB();
    await User.create(userData);
  }
);

// Inngest Function to update database
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest Function to delete
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connDB();
    await User.findByIdAndDelete(id);
  }
);

// Scheduled sync: pull all Clerk users into MongoDB every hour.
// Runs fully in code — no webhook/transform dashboard setup needed.
export const syncAllUsersScheduled = inngest.createFunction(
  { id: "sync-all-users-from-clerk" },
  { cron: "0 * * * *" },
  async () => {
    const { clerkClient } = await import("@clerk/nextjs/server");
    const client = await clerkClient();
    await connDB();

    const clerkIds = new Set();
    let offset = 0;
    for (;;) {
      const { data, totalCount } = await client.users.getUserList({
        limit: 100,
        offset,
      });
      for (const u of data) {
        clerkIds.add(u.id);
        await User.findByIdAndUpdate(
          u.id,
          {
            email: u.emailAddresses?.[0]?.emailAddress ?? "",
            name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || "User",
            imageUrl: u.imageUrl ?? "",
          },
          { upsert: true }
        );
      }
      offset += data.length;
      if (offset >= totalCount || data.length === 0) break;
    }

    // Remove users that were deleted from Clerk
    const dbIds = (await User.find({}, { _id: 1 }).lean()).map((u) => u._id);
    const stale = dbIds.filter((id) => !clerkIds.has(id));
    if (stale.length > 0) {
      await User.deleteMany({ _id: { $in: stale } });
    }

    return { success: true, synced: clerkIds.size, removed: stale.length };
  }
);

// Inngest to create user order in db
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5,
      timeout: "5s",
    },
  },
  {
    event: "order/created",
  },
  async ({events}) => {
    const orders = events.map((event)=>{
      return {
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.date
      }
    })
    await connDB()
    await Order.insertMany(orders)
    return { success: true, process: orders.length};
  }
);
