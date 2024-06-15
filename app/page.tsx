import path from "path";
import fs from "fs";

const Home = () => {
  const filePath = path.join(process.cwd(), 'docs', 'asvs.json');
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data: Category[] = JSON.parse(fileContents);

  return (
    <>
      <h1>Solomon</h1>
      {data.map((item) =>  (<p key={item.id}>{item.category_name}</p>))}
    </>
  );
}

export default Home;
