import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authApiCall } from "../../utils/auth-api";

interface AuthDialogProps {
  onClose: (success: boolean, isCancel?: boolean) => void;
  mode: "login" | "register";
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function AuthDialog({ onClose, mode }: AuthDialogProps) {
  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const result = await authApiCall(mode, values);
      console.log("Success:", result);
      onClose(true);
    } catch (error) {
      console.error("Error:", error);
      onClose(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded w-96">
        <h2 className="text-black text-xl mb-4">{mode === "login" ? "Login" : "Register"}</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="block text-black">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 p-2 rounded w-full text-black"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div>
                <label htmlFor="password" className="block text-black">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border border-gray-300 p-2 rounded w-full text-black"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="bg-black text-white py-2 px-4 rounded" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : mode === "login" ? "Login" : "Register"}
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => onClose(false, true)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
