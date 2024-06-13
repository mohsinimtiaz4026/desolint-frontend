import Image from "next/image";
// assets
import Logo from "../../assets/logo.png";
// formik
import { Formik } from "formik";

const LoginScreen = () => {
    return (
        <section>
            <div className="container">
                <div className="align-items-center row">
                    <div className="px-lg-4 col-lg-6 order-lg-1 order-2">
                        <div className="card mt-5 mb-5">
                            <div className="px-lg-5 card-header">
                                <div className="card-heading text-danger">DESOL INT.</div>
                            </div>
                            <div className="p-lg-5 card-body">
                                <h3 className="mb-4">Hi, welcome back! 👋👋</h3>
                                <p className="text-muted text-sm mb-5">Only Authorized User Can Access.</p>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = 'Email Is Required';
                                        }
                                        if (!values.password) {
                                            errors.password = 'Password Is Required';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false);
                                        }, 400);
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
                                    }) => <form id="loginForm" onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input
                                                    id="email"
                                                    className="form-control"
                                                    type="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email} />
                                                <div className="error-box">{errors.email && touched.email && errors.email}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                <div className="error-box">{errors.password && touched.password && errors.password}</div>
                                            </div>
                                            <button
                                                type="submit" className="btn btn-danger btn-lg"
                                                disabled={isSubmitting}>Submit</button>
                                        </form>
                                    }
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="ms-xl-auto px-lg-4 text-center col-xl-5 col-lg-6 order-lg-2 order-1 my-md-5">
                        <Image src={Logo} alt='logo'
                            className='manageImg'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginScreen