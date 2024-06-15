import { FC, ReactNode } from "react";
import Topbar from "./topbar";
import Footer from "./footer";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <>
    <Topbar />
    <div className="min-h-screen w-5/6 4xl:w-3/6 mx-auto"> 
      {children}
    </div>
    <Footer />
    </>
  )
}

export default Container;
