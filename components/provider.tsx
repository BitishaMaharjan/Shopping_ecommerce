import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
import ClientProvider from "./ClientProvider"

export default async function Provider({
    children,
}:{
    children : React.ReactNode
}) {
    const session = await auth()
    return <SessionProvider session={session}><ClientProvider>{children}</ClientProvider></SessionProvider>
}