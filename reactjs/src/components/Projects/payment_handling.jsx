import { React } from "react";
import Post_Pledge from "./post_success_pledge";
import Pledge_Error from "./pledge_error";

export default function Payment_Handling() {

    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    console.log(status);

    if (status === 'Completed') {
        return (
            <Post_Pledge />
        )
    }
    else {
        return (
                <Pledge_Error/>
        )
    }
}