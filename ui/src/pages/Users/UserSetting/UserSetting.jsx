import BackGround from "../../../components/Wrapper/BackGround/BackGround";
import Container from "../../../components/Wrapper/Container/Container";
import Tabs from "../../../components/Buttons/Tabs/Tabs";
import {useEffect, useState} from "react";
import ProfileSetting from "./ProfileSetting";
import SecuritySetting from "./SecuritySetting";
import ProfileCard from "../../../components/Card/ProfileCard/ProfileCard";
import PasswordCard from "../../../components/Card/PasswordCard/PasswordCard";

function UserSetting() {
    const [isProfile, setIsProfile] = useState(true);
    const [isUserPassword, setIsUserPassword] = useState(false);

    return (
        <BackGround background={"linear-gradient(111deg, rgba(27,102,122,1) 0%, rgba(148,198,233,1) 79%)"}>
            <Container className={"pt-6"}>
                <div className={"w-full"}>
                    <Tabs boolean={isProfile} setBoolean={setIsProfile} optionA={"Profile"} optionB={"Security"}/>
                    <ProfileCard className={`rounded-none rounded-b-lg w-full border-none bg-white bg-opacity-40 ${!isUserPassword ? "p-0" : ''}`}>
                        {isUserPassword ?
                            isProfile ?
                                <ProfileSetting/> :
                                <SecuritySetting/>
                            :
                            <div className={"flex w-full items-center justify-center"}>
                                <PasswordCard setIsPasswordValid={setIsUserPassword}/>
                            </div>
                        }
                    </ProfileCard>
                </div>
            </Container>
        </BackGround>
    );
}

export default UserSetting;