"use client";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import Link from "next/link";
import "./registerForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormError from "../formError/formError";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const RegisterApi = async (values) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, values, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      location.replace("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const validation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^(?:\+201|01|00201)[0-2,5][0-9]{8}$/, "Enter a valid Egyptian phone number")
      .required("Phone number is required"),

    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      password: "",
    },
    validationSchema: validation,
    validateOnBlur: true,
    onSubmit: (values) => {
      RegisterApi(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <p className="form-title">Create new account</p>
      <Input
        id="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        type={"text"}
        onBlur={formik.handleBlur}
        placeholder={"Enter name"}
      />
      {formik.errors.name && formik.touched.name && <FormError>{formik.errors.name}</FormError>}
      <Input
        id="phone"
        onChange={formik.handleChange}
        value={formik.values.phone}
        type={"text"}
        onBlur={formik.handleBlur}
        placeholder={"Enter phone"}
      />
      {formik.errors.phone && formik.touched.phone && <FormError>{formik.errors.phone}</FormError>}
      <Input
        id={"password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type={"password"}
        placeholder={"Enter password"}
      />
      {formik.errors.password && formik.touched.password && <FormError>{formik.errors.password}</FormError>}
      <Button
        disabled={!formik.values.name || !formik.values.phone || !formik.values.password}
        variant="secondary"
        title={formik.errors.phone || formik.errors.password}
        className={"w-full mt-2"}
        type="submit">
        Submit
      </Button>

      <p className="signup-link">
        No account?
        <Link href="/register">Sign up</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
