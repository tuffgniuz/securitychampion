import RequirementsTable from "./lib/components/requirements-table";
import SubCategories from "./lib/components/sub-categories";
import Topbar from "./lib/components/topbar";

import { fetchAsvsData } from "./lib/utils";

const Home = async () => {
  const data: Category[] = fetchAsvsData();
  
  return (
    <>
      <Topbar />
      <div className="w-5/6 mx-auto">

      <input 
        type="text"
        placeholder="Search ..."
        autoComplete="off"
        className="
          outline-none
          border-none
          w-full 
          bg-nord-polarnight-100 
          mb-10
          p-2 
          rounded-xl
        "
      />

      {data.map((c) => (
        <div className="mb-10">
          <h1 className="text-nord-aurora-purple flex gap-2 text-lg font-semibold mb-5">
            <span className="rounded-full">{c.category_id}</span>
            {c.category_name}
          </h1>
          <p className="mb-5">{c.summary}</p>
          <SubCategories subCategories={c.sub_categories} />
          <RequirementsTable subCategories={c.sub_categories} />
        </div>
      ))} 
      </div>
    </>
  );
}

export default Home;
