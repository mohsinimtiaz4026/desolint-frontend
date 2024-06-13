import { useState,useEffect } from "react";

const DashboardScreen = () => {
    const [files, setFiles] = useState([]);
    
    const imageFieldRender = () => {

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
                setFiles(prevFiles => [...prevFiles],newFile);
            })
            target.appendChild(field);
        }
    }
    return (
        <section className='container'>
            <div className='row'>
                <div className='col my-4'>
                    <div className="d-flex justify-content-between">
                        <h2>Vehicle Information Form</h2>
                        <button className="btn btn-danger">Logout</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="model">Car Model:</label>
                            <input type="text"
                                id="model"
                                minLength={3}
                                className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="price">Car Price:</label>
                            <input type="number"
                                id="price"
                                className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="phone">Phone:</label>
                            <input type="number"
                                max={11}
                                id="phone"
                                className="form-control" />
                        </div>
                        <div className="mb-3 d-flex">
                            <label className="form-label" htmlFor="phone">City:</label>
                            <div className="d-flex">
                                <div className="form-check radioWrapper">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Lahore
                                    </label>
                                </div>
                                <div className="form-check radioWrapper">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                                        style={{width: "100px", height:"100px",objectFit: "cover",margin: "0 5px"}}/>
                                    ))
                                }
                            </div>
                        </div>
                        <button type="submit" className='btn btn-danger mt-3'>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default DashboardScreen;