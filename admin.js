// admin.js
import admin from "firebase-admin"
import fs from "fs"

// Load service account
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function setupAdminUser(uid) {
    try {
        await db.collection("admins").doc(uid).set({
            role: "admin",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            permissions: ["products:write", "orders:write", "users:read"],
        })
        console.log(`✅ Admin user '${uid}' created successfully.`)
    } catch (error) {
        console.error("❌ Error creating admin user:", error)
        process.exit(1)
    }
}

const uid = process.argv[2]

if (!uid) {
    console.error("❗ Please provide a user UID:\n   node admin.js <user-uid>")
    process.exit(1)
}

setupAdminUser(uid)
