import { useState } from "react";
import { useRouter } from "next/router";
// axios
import axios from "axios";
// formik
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";

const DashboardScreen = () => {
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const router = useRouter();
    const imageFieldRender = async () => {

        let selectValues = document.getElementById('imagesValue').value;
        let target = document.getElementById('imageField');

        target.innerHTML = "";
        for (let i = 1; i <= selectValues; i++) {
            let field = document.createElement('input');
            field.type = "file";
            field.name = "files";
            field.classList.add('form-control');
            field.classList.add('w-100');
            field.classList.add('mt-3');
            field.classList.add('mb-3');
            field.addEventListener('change', async (event) => {
                let file = event.target.files[0];
                let newFile = files;
                newFile.push(file);
                setFiles(newFile);
                if (files.length == selectValues) {
                    let form_data = new FormData();
                    files.forEach((file) => {
                        form_data.append("files", file);
                    })
                    let res = await axios.post('http://localhost:8000/api/task/upload-files', form_data);
                    let images = res.data.data;
                    let newImages = [];
                    images.forEach((img) => {
                        let newImage = `${img}`;
                        newImages.push(newImage);
                    })
                    setUploadedFiles(newImages);
                }
            })
            target.appendChild(field);
        }
    }
    const logoutUser = () => {
        localStorage.removeItem("user");
        router.push('/auth');
    }
    return (
        <section className='container'>
            <Toaster />
            <div className='row'>
                <div className='col my-4'>
                    <div className="d-flex justify-content-between">
                        <h2>Vehicle Information Form</h2>
                        <button className="btn btn-danger" onClick={() => logoutUser()}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Formik
                        initialValues={{ car_model: '', price: '', phone_number: '', selectedCity: '', images: uploadedFiles }}
                        validate={values => {
                            const errors = {};
                            let letterRegex = /[a-zA-Z]/;
                            let letterCount = values.car_model.split('').filter(char => letterRegex.test(char)).length;
                            if (letterCount < 3) {
                                errors.car_model = 'Car Model String Minimum Letters Should be 3';
                            }
                            if (isNaN(values.price)) {
                                errors.price = 'Price Should be a Number';
                            }
                            let digitRegex = /^\d{11}$/;
                            if (digitRegex.test(values.phone_number)) {
                                errors.phone_number = 'Phone Should be a 11 Digits Only';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setTimeout(() => {
                                console.log(values);
                                setSubmitting(false);
                            }, 400);
                            // const data = await axios.post("http://localhost:8000/api/task/add-vehicle", values);
                            // if (data.status === 200) {
                            // console.log(data);
                            toast.success("Add Vehicle Info Succesfully");
                            // }
                        }}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="car_model">Car Model:</label>
                                    <input type="text"
                                        id="car_model"
                                        minLength={3}
                                        className="form-control"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.car_model}
                                    />
                                    <div className="error-box">{errors.car_model && touched.car_model && errors.car_model}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price">Car Price:</label>
                                    <input type="text"
                                        id="price"
                                        className="form-control"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                    />
                                    <div className="error-box">{errors.price && touched.price && errors.price}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="phone_number">Phone:</label>
                                    <input type="number"
                                        id="phone_number"
                                        className="form-control"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone_number}
                                    />
                                    <div className="error-box">{errors.phone_number && touched.phone_number && errors.phone_number}</div>
                                </div>
                                <div className="mb-3 d-flex">
                                    <label className="form-label" htmlFor="city">City:</label>
                                    <div className="d-flex">
                                        <div className="form-check radioWrapper">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="selectedCity"
                                                id="flexRadioDefault1"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={'Lahore'}
                                                checked={values.selectedCity === 'Lahore'} // Check if the value matches selectedCity
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Lahore
                                            </label>
                                        </div>
                                        <div className="form-check radioWrapper">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="selectedCity"
                                                id="flexRadioDefault2"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={'Karachi'}
                                                checked={values.selectedCity === 'Karachi'} // Check if the value matches selectedCity
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Karachi
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className='mb-1'>Upload No of Images</label>
                                    <select className='form-control form-control-md'
                                        id="imagesValue" onChange={imageFieldRender}>
                                        <option defaultValue>No Of Images.</option>
                                        <option value={'1'}>1</option>
                                        <option value={'2'}>2</option>
                                        <option value={'3'}>3</option>
                                        <option value={'4'}>4</option>
                                        <option value={'5'}>5</option>
                                        <option value={'6'}>6</option>
                                        <option value={'7'}>7</option>
                                        <option value={'8'}>8</option>
                                        <option value={'9'}>9</option>
                                        <option value={'10'}>10</option>
                                    </select>
                                    <div id='imageField'></div>
                                    <div className="mt-3">
                                        {
                                            files?.map((file, index) => (
                                                <img key={index} src={URL.createObjectURL(file)} alt={`Uploaded Image ${index + 1}`}
                                                    style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0 5px" }} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <button type="submit" className='btn btn-danger mt-3'
                                    disabled={isSubmitting}>Submit</button>
                            </form>
                        }
                    </Formik>
                </div>
            </div>
        </section>
    );
}
export default DashboardScreen;