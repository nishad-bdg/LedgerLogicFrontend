import React, { useState } from "react";
import useAuthMiddleware from "../middleware/authMiddleware";
import SideBarComp from "../components/NewSideBarComp";
import TextInput from "../components/inputs/TextInput";
import dynamic from "next/dynamic";
import Table from "../components/Table";
import validateEmail from "../helpers/validateEmail";
import { useMutation } from "urql";
import { CREATE_CUSTOMER_MUTATION } from "../gql/mutations";
import { getToken } from "../store/authStore";
import { parseJwt } from "../utils/decodeToken";

const Modal = dynamic(() => import("../components/Modal"));

interface FormData {
  customerName: string;
  email: string;
  mobileNo: string;
  creditLimit: string;
  isBlocked: boolean;
}

const Customers = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [createCustomerResult, createCustomer] = useMutation(
    CREATE_CUSTOMER_MUTATION
  );

  useAuthMiddleware();

  const toggleModal = () => {
    setIsOpen(true);
  };
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    email: "",
    mobileNo: "",
    creditLimit: "0",
    isBlocked: false,
  });
  const [formErrors, setFormErrors] = useState({
    customerName: "",
    email: "",
    mobileNo: "",
  });

  const handleChange = (fieldName: string, value: string): void => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = {
      customerName: "",
      email: "",
      mobileNo: "",
    };
    let isValid = true;
    if (!formData.customerName.trim()) {
      errors.customerName = "Customer name is required";
      isValid = false;
    }

    if (formData.customerName.length < 3) {
      errors.customerName = "Customer name must have minimum 3 characters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "email is required";
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      errors.email = "Please enter valid email";
      isValid = false;
    }

    if (!formData.mobileNo.trim()) {
      errors.mobileNo = "Mobile is required";
      isValid = false;
    }

    if (formData.mobileNo.length < 11) {
      errors.mobileNo = "Mobile no must have 11 characters";
      isValid = false;
    }

    setFormErrors(errors);

    if (isValid) {
      setFormErrors({
        customerName: "",
        email: "",
        mobileNo: "",
      });
      const accessToken = getToken();

      const headers = { Authorization: `Bearer ${accessToken}` };
      try {
        const result = await createCustomer(
          {
            customerInput: {
              customerName: formData.customerName,
              email: formData.email,
              mobileNo: Number(formData.mobileNo),
              creditLimit: parseFloat(formData.creditLimit),
              isBlocked: false,
            },
          },
          { headers }
        );
        console.info("result", result);
      } catch (err) {
        console.error(err);
      }
      setIsOpen(false);
    }
  };

  return (
    <div className="p-4 md:ml-64">
      <SideBarComp />
      <div>
        <div className=" flex justify-between">
          <h4 className=" text-3xl">Customers List:</h4>{" "}
          <button
            onClick={toggleModal}
            className="text-blue-700 md:w-64 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add New Entry
          </button>
        </div>
        {/* modal */}
        {isOpen && (
          <Modal
            title="Create Customer"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <form onSubmit={handleSubmit}>
              {/* customer name */}
              <div className="m-3">
                <TextInput
                  label="Customer Name*"
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  placeholder="Customer Name"
                  onChange={(value: string) =>
                    handleChange("customerName", value)
                  }
                  minLength={3}
                  required={!formData.customerName}
                />
                {formErrors.customerName && (
                  <span className="text-red-500">
                    {formErrors.customerName}
                  </span>
                )}
              </div>
              {/* customer name */}
              {/* email */}
              <div className="m-3">
                <TextInput
                  label="Email*"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value: string) => handleChange("email", value)}
                  placeholder="test@email.com"
                  required
                />
                {formErrors.email && (
                  <span className="text-red-500">{formErrors.email}</span>
                )}
              </div>
              {/* email */}

              {/* mobile */}
              <div className="m-3">
                <TextInput
                  label="Mobile No*"
                  name="mobileNo"
                  type="mobileNo"
                  value={formData.mobileNo}
                  onChange={(value: string) => handleChange("mobileNo", value)}
                  placeholder="01**********"
                  required
                />
                {formErrors.mobileNo && (
                  <span className="text-red-500">{formErrors.mobileNo}</span>
                )}
              </div>
              {/* mobile */}

              {/* credit Limit */}
              <div className="m-3">
                <TextInput
                  label="Credit Limit"
                  name="creditLimit"
                  type="creditLimit"
                  value={formData.creditLimit}
                  onChange={(value: string) =>
                    handleChange("creditLimit", value)
                  }
                  placeholder="0000"
                />
              </div>
              {/* credit limit */}

              <div className="m-3">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal>
        )}
        <Table />
      </div>
    </div>
  );
};

export default Customers;
