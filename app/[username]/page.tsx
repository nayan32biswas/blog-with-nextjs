export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <h1 className="text-5xl">User Page -- {username}</h1>
    </div>
  );
}
