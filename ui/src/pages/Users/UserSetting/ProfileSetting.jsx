import UserAvatar from "../../../components/Images/UserAvatar";
import UserProfileInput from "../../../components/Inputs/UserPofileInputs/UserProfileInput";
import styles from './UserSetting.module.scss';
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {fetchUpdate} from "../../../utils/Axios/axiosFunctions";
import userAvatar from "../../../components/Images/UserAvatar";
import FormErrorMessage from "../../../components/Message/FormErrorMessage";

function ProfileSetting(props) {
    const owner = props.owner;

    const [image, setImage] = useState(owner.userAvatar);
    const [isImageRemove, setIsImageRemove] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    const {
        register,
        formState: {
            errors,
            dirtyFields
        },
        handleSubmit,
        reset,
        getValues,
        watch,
        setError,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            firstname: owner.firstname || "",
            lastname: owner.lastname || "",
            userStatus: owner.userStatus || "",
            location: owner.location || "",
            aboutUser: owner.aboutUser || "",
        }
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
        const file = event.target.files[0];
        setUploadedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
                setIsImageRemove(false);
            }
            reader.readAsDataURL(file);
        }

    }

    const values = watch();

    useEffect(() => {
        Object.keys(dirtyFields).length > 0 ?
            setIsDirty(true) : setIsDirty(false);
    }, [values]);



    const onSubmit = async (data) => {
        const formData = new FormData();

        if (uploadedImage) {
            formData.append("userAvatar", uploadedImage);
            formData.append("imageOperation", "replace");
        } else if (isImageRemove){
            formData.append("imageOperation", "replace");
        }

        for (const [key, value] of Object.entries(data)) {
            if (value) {
                formData.append(key, value);
            }
        }

        const response = await fetchUpdate(`/users/${owner._id}`, formData);
        console.log(response);
    }

    return (
        <form className={"flex w-full h-full"} onSubmit={handleSubmit(onSubmit)}>
            <div className={"flex flex-col items-center"}>
                <div
                    className={"border rounded-lg flex flex-col p-6 pb-4 bg-white shadow-md items-center justify-center"}>
                    <UserAvatar image={image} className={"h-44 w-44"} isOwner={true}
                                isChanged={true} onClick={handleImageClick}
                                setIsClicked={setIsImageRemove} isClicked={isImageRemove}/>

                    <input type="file" hidden={true} onInput={handleFileChange}
                           id={"fileInput"}
                           {...register('userAvatar')}/>

                    <div className={"w-full flex flex-col py-2"} style={{minWidth: "180px"}}>
                        <label className={styles.label}>Firstname</label>
                        <UserProfileInput placeholder={owner.firstname}  register={{
                            ...register("firstname", {
                                required: {
                                    value: true,
                                    message: "Field is required."
                                },
                                minLength: {
                                    value: 3,
                                    message: "Firstname too short."
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Firstname too long."
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: "Only letters."
                                }
                            })
                        }}/>
                        <FormErrorMessage errorField={errors?.firstname}/>
                    </div>
                    <div className={"w-full flex flex-col py-2"}>
                        <label className={styles.label}>Lastname</label>
                        <UserProfileInput placeholder={owner.lastname} register={{
                            ...register("lastname", {
                                required: {
                                    value: true,
                                    message: "Field is required."
                                },
                                minLength: {
                                    value: 3,
                                    message: "Lastname too short."
                                },
                                maxLength: {
                                    value: 15,
                                    message: "LastName too long."
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: "Only letters."
                                }
                            })
                        }}/>
                        <FormErrorMessage errorField={errors?.lastname}/>
                    </div>
                </div>
                <div className={"bg-white shadow-md mt-3 p-3 rounded-lg w-full text-center"}>
                    <button className={`rounded-lg bg-blue-500 text-white  cursor-pointer py-2 px-7 ${styles.submit}`}
                            type={"submit"} disabled={!isDirty}>
                        Save
                    </button>
                </div>
            </div>
            <div className={"flex flex-col justify-between w-full ml-2"}>
                    <div className={"bg-white shadow-md  rounded-lg flex flex-col justify-around p-4 h-3/4 mb-5"} style={{minHeight: "359px"}}>
                        <div className={"w-full flex flex-col "}>
                            <label className={styles.label}>Status</label>
                            <UserProfileInput placeholder={owner.userStatus ? owner.userStatus : "Not indicated"}
                                              inputType={"text"}  register={{
                                ...register("userStatus",
                                    {
                                        maxLength: {
                                            value: 30,
                                            message: "Status too long."
                                        }
                                    })
                            }}/>
                            <FormErrorMessage errorField={errors?.userStatus}/>
                        </div>
                        <div className={"w-full flex flex-col "}>
                            <label className={styles.label}>Location <FontAwesomeIcon icon={faLocationDot}/></label>
                            <UserProfileInput placeholder={owner.location ? owner.location : "Not indicated"}
                                              inputType={"text"} register={{
                                ...register("location", {
                                    maxLength: {
                                        value: "30",
                                        message: "Field name too long."
                                    }
                                })
                            }}/>
                            <FormErrorMessage errorField={errors?.location}/>

                        </div>
                    </div>
                <div className={"bg-white shadow-md  rounded-lg flex flex-col justify-around p-4"}>
                    <div className={"w-full flex flex-col"}>
                        <label className={styles.label}>About me</label>
                        <UserProfileInput placeholder={owner.aboutUser ? owner.aboutUser : "Not indicated"}
                                          inputType={"textarea"}
                                          onInput={handleAboutUserInput}
                                          register={{
                                              ...register('aboutUser', {
                                                  maxLength: {
                                                      value: 700,
                                                      message: "Field too long."
                                                  }
                                              })
                                          }}
                        />
                        <FormErrorMessage errorField={errors?.aboutUser}/>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ProfileSetting;