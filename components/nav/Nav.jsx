export default async function Nav({children}) {

  return (
    <nav className=" bg-stone-50 border-b-1 px-12 py-6">
      {children}
    </nav>
  );
}
