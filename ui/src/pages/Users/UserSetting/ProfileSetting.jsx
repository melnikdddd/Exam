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
import {useDispatch, useSelector} from "react-redux";
import {selectUserData, updateValue} from "../../../store/slices/UserDataSlice";
import {defaultImage} from "../../../components/Images/utils";
import {useNavigate} from "react-router-dom";

function ProfileSetting(props) {
    const owner = useSelector(selectUserData);

    const isImageClear = owner.isDefaultImage;
    const [isImageRemoved, setIsImageRemoved] = useState(isImageClear);
    const [image, setImage] = useState(owner.userAvatar);

    const [uploadedImage, setUploadedImage] = useState(null);
    const [isDirty, setIsDirty] = useState(false);


    const dispatch = useDispatch();

    const {
        register,
        formState: {
            errors,
            dirtyFields,
            isValid
        },
        handleSubmit,
        reset,
        setValue,
        watch,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            firstname: owner.firstname || "",
            lastname: owner.lastname || "",
            userStatus: owner.userStatus || "",
            location: owner.location || "",
            aboutUser: owner.aboutUser || "",
            isImageRemoved: isImageRemoved,
        }
    });
    
    const resetForm = (newData) =>{
        reset(newData);
        const fileInputValue =  document.querySelector("#fileInput").value;
        if (fileInputValue){
            document.querySelector("#fileInput").value= "";
        }
        setUploadedImage(null);
    }

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
                setIsImageRemoved(false);
            }
            reader.readAsDataURL(file);
        }

    }
    const values = watch();

    useEffect(() => {
        Object.keys(dirtyFields).length > 0 ?
            setIsDirty(true) : setIsDirty(false);
    }, [values]);

    useEffect(() => {

        if(isImageRemoved){
            setUploadedImage(null);
            document.querySelector("#fileInput").value = "";
            setValue("isImageRemoved", true, { shouldDirty: !isImageClear });
            setImage(defaultImage().userImage);
            return;
        }

        setValue("isImageRemoved", false);
    }, [isImageRemoved]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        const {userAvatar, isImageRemoved, ...sendData} = data;


        if (uploadedImage) {
            formData.append("userAvatar", uploadedImage);
            formData.append("imageOperation", "replace");
        } else if (isImageRemoved){
            formData.append("imageOperation", "remove");
        }


        for (const [key, value] of Object.entries(sendData)) {
            if (value) formData.append(key, value);
        }


        const response = await fetchUpdate(`/users/${owner._id}`, formData);

        for (const key of formData.keys()) {
            formData.delete(key);
        }

        if (response.success === true){
            for (const [field, value] of Object.entries(sendData)) {
               dispatch(updateValue({field, value}));
            }
            resetForm(sendData);

            if (uploadedImage){
                dispatch(updateValue({field: "userAvatar", value: image}))
                dispatch(updateValue({field: "isDefaultImage", value: false}))

            } else if (isImageRemoved){
                dispatch(updateValue({field: "userAvatar", value: defaultImage().userImage}));
                dispatch(updateValue({field: "isDefaultImage", value: true}));
            }
            return;
        }
        reset();
    }


    return (
        <form className={"flex w-full h-full"} onSubmit={handleSubmit(onSubmit)}>
            <div className={"flex flex-col items-center"}>
                <div
                    className={"border rounded-lg flex flex-col p-6 pb-4 bg-white shadow-md items-center justify-center"}>
                    <UserAvatar image={image} className={"h-44 w-44 mb-3"} isOwner={true}
                                isChanged={true} onClick={handleImageClick}
                                setIsClicked={setIsImageRemoved} isClicked={isImageRemoved}/>

                    <input type="file" hidden={true} onInput={handleFileChange}
                           id={"fileInput"} accept={".jpg,.jpeg,.png"}
                           {...register('userAvatar')}/>

                    <input type="checkbox" hidden={true} {...register("isImageRemoved")}/>

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
                            type={"submit"} disabled={!(isDirty && isValid)}>
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