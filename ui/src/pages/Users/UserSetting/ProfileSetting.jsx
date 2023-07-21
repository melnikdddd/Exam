import {useEffect} from 'react';
import UserAvatar from "../../../components/Images/UserAvatar";
import UserProfileInput from "../../../components/Inputs/UserPofileInputs/UserProfileInput";
import styles from './UserSetting.module.scss';
import {useForm} from "react-hook-form";
import {text} from "@fortawesome/fontawesome-svg-core";

function ProfileSetting(props) {
    const owner = props.owner;

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
        watch,
        setError,
    } = useForm({
        mode: "onChange"
    });

    const handleAboutUserInput = (event)=> {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    return (
        <form className={"flex flex-row w-full h-full"}>
            <div className={"border rounded-lg flex flex-col p-6 pb-4 bg-white shadow-md items-center justify-center"}
                 style={{height: "360px"}}>
                <UserAvatar image={owner.userAvatar} className={"h-44 w-44"} isOwner={true}/>
                <div className={"w-full flex flex-col py-2"} style={{minWidth: "180px"}}>
                    <label className={styles.label}>Firstname</label>
                    <UserProfileInput placeholder={owner.firstname}/>
                </div>
                <div className={"w-full flex flex-col py-2"}>
                    <label className={styles.label}>Lastname</label>
                    <UserProfileInput placeholder={owner.lastname}/>
                </div>
            </div>
            <div className={"bg-white shadow-md ml-2 rounded-lg w-full flex flex-col  p-4"}>
                <div className={"w-full flex flex-col py-2"} style={{minWidth: "180px"}}>
                    <label className={styles.label}>Status</label>
                    <UserProfileInput placeholder={owner.status ? owner.status : "Not indicated"} inputType={"text"}/>
                </div>
                <div className={"w-full flex flex-col py-2 mt-28"}>
                    <label className={styles.label}>About me</label>
                    <UserProfileInput placeholder={owner.aboutUser ? owner.aboutUser : "Not indicated"}
                                      inputType={"textarea"}
                                      onInput={handleAboutUserInput}
                                      register={{
                                          ...register('aboutUser',{
                                              maxLength: {
                                                  value: 255,
                                                  message: "Field too long."
                                              }
                                          })
                                      }}
                    />
                </div>
            </div>
        </form>
    );
}

export default ProfileSetting;