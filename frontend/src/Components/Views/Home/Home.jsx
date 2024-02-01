import TitleName from "../../../utilities/TitleName";
import Call from "../../UI/Call/Call";
import Featured from "../../UI/Featured/Featured";
import Header from "../../UI/Header/Header";

import Info from "../../UI/info/Info";


export default function Home() {
    return (
        <>
            <Header />
            <TitleName title='Reacthor' />
            <Info />
            <Featured />
            <Call />
        </>
    )
}
