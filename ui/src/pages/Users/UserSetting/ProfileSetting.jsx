import UserAvatar from "../../../components/Images/UserAvatar";
import UserProfileInput from "../../../components/Inputs/UserPofileInputs/UserProfileInput";
import styles from './UserSetting.module.scss';
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {fetchUpdate} from "../../../utils/Axios/functions";
import userAvatar from "../../../components/Images/UserAvatar";

function ProfileSetting(props) {
    const owner = props.owner;

    const [image, setImage] = useState(owner.userAvatar);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isFormDirty, setIsFormDirty] = useState(false);

    console.log(isFormDirty);
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
        watch,
        setError,
        formState,
    } = useForm({
        mode: "onChange"
    });



    const handleAboutUserInput = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }


    const handleImageClick = (event) => {
        document.getElementById("fileInput").click();
    }
    const handleFileChange = (event) => {
        const file =  event.target.files[0];
        setUploadedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file);
        }

    }

    useEffect(() => {
        setIsFormDirty(formState.isDirty)
    }, [formState.isDirty]);


    const onSubmit = async  () => {
        const formData = new FormData();

        console.log(formState.dirtyFields);

        if (uploadedImage){
            formData.append("userAvatar", uploadedImage);
            formData.append("imageOperation", "replace");
        }

       const response = await fetchUpdate(`/users/${owner._id}`, formData);
        console.log(response);
    }

    return (
        <form className={"flex w-full h-full"} onSubmit={handleSubmit(onSubmit)}>
            <div className={"flex flex-col items-center"}>
                <div
                    className={"border rounded-lg flex flex-col p-6 pb-4 bg-white shadow-md items-center justify-center"}
                    style={{height: "360px"}}>
                    <UserAvatar image={image} className={"h-44 w-44"} isOwner={true}
                                isChanged={true} onClick={handleImageClick}/>

                    <input type="file" hidden={true} onInput={handleFileChange}
                           id={"fileInput"}
                           {...register('userAvatar')}/>

                    <div className={"w-full flex flex-col py-2"} style={{minWidth: "180px"}}>
                        <label className={styles.label}>Firstname</label>
                        <UserProfileInput placeholder={owner.firstname}/>
                    </div>
                    <div className={"w-full flex flex-col py-2"}>
                        <label className={styles.label}>Lastname</label>
                        <UserProfileInput placeholder={owner.lastname}/>
                    </div>
                </div>
                <div className={"bg-white shadow-md mt-3 p-3 rounded-lg w-full text-center"}>
                    <button  className={`rounded-lg bg-blue-500 text-white  cursor-pointer py-2 px-7 ${styles.submit}`}
                             type={"submit"} disabled={!isFormDirty}>
                        Save
                    </button>
                </div>
            </div>
            <div className={"bg-white shadow-md ml-2 rounded-lg w-full flex flex-col justify-around p-4"}>
                <div className={"w-full flex flex-col basis-1/3"}>
                    <label className={styles.label}>Status</label>
                    <UserProfileInput placeholder={owner.status ? owner.status : "Not indicated"} inputType={"text"}/>
                </div>
                <div className={"w-full flex flex-col basis-1/3 my-20"}>
                    <label className={styles.label}>Location <FontAwesomeIcon icon={faLocationDot}/></label>
                    <UserProfileInput placeholder={owner.location ? owner.location : "Not indicated"}
                                      inputType={"text"}/>
                </div>
                <div className={"w-full flex flex-col basis-1/3 "}>
                    <label className={styles.label}>About me</label>
                    <UserProfileInput placeholder={owner.aboutUser ? owner.aboutUser : "Not indicated"}
                                      inputType={"textarea"}
                                      onInput={handleAboutUserInput}
                                      register={{
                                          ...register('aboutUser', {
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