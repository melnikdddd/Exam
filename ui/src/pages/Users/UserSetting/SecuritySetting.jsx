import React from 'react';
import AuthInput from "../../../components/Inputs/Auth/AuthInput";

function SecuritySetting(props) {
    return (
        <div className={"flex w-full h-full items-center justify-center"}>
            <form className={"border rounded-lg flex flex-col p-20 bg-white shadow-md items-center justify-center"}>
                <h1 className={"text-2xl"}>Change password</h1>
                <hr className={"bg-slate-800 w-full my-3"}/>
                <div className={"flex flex-col w-full my-3"}>
                    <label>New password</label>
                    <AuthInput/>
                </div>
                <div className={"flex flex-col w-full my-3"}>
                    <label>Repeat new password</label>
                    <AuthInput/>
                </div>
                <button>Save</button>
            </form>
        </div>
    );
}

export default SecuritySetting;