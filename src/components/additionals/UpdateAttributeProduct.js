import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateAttributeProduct(props) {
  const { show, onHide, serialno } = props;
  const [attributes, setAttributes] = useState("");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [taxrate, setTaxrate] = useState("");
  const [attributeList, setAttributeList] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);

  const resetForm = () => {
    setAttributes("");
    setValue("");
    setPrice("");
    setInventory("");
    setTaxrate("");
  };

  useEffect(() => {
    (async () => await fetchData())();
  }, []);

  async function fetchData() {
    const result = await axios.get("http://127.0.0.1:8000/attribute");
    setAttributeList(result.data);
  }

  const handleAttributeChange = (selectedAttribute) => {
    const filteredValues = attributeList
      .filter((item) => item.attribute === selectedAttribute)
      .map((item) => item.value);

    setAttributeValues(filteredValues);
    setAttributes(selectedAttribute);
    setValue("");
  };

  const handleAddAttribute = async () => {
    const attributedata = {
      attribute: attributes,
      value: value,
      price: price,
      inventory: inventory,
      taxrate: taxrate,
    };

    try {
      const productData = {
        serialno: serialno,
        inventory: [attributedata],
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/inventory",
        productData
      );

      if (response.data) {
        toast.success("Product Attribute Added Successfully");
        resetForm();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Product Already added");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop="static"
        size="lg"
        className="confirmmodal-Back"
      >
        <Modal.Header closeButton>
          <Modal.Title className="Modal-Title">Update attributes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="modal-body">
              {/* <div className="row mb-2">
                <div className="col-12">
                  <div className="form-outline mb-4">
                    <label
                      className="form-label"
                      htmlFor="inputAddAttribute-attribute"
                    >
                      SeialNo
                    </label>
                    <div className="row mb-2">
                      <input
                        type="text"
                        id="inputAddAttribute-value"
                        className="form-control"
                        value={serialno}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row mb-2">
                <div className="col-6">
                  <div className="form-outline mb-4">
                    <label
                      className="form-label"
                      htmlFor="inputAddAttribute-attribute"
                    >
                      Attribute
                    </label>
                    <select
                      id="selectAddAttribute-attribute"
                      className="form-select"
                      onChange={(e) => {
                        setAttributes(e.target.value);
                        handleAttributeChange(e.target.value);
                      }}
                      value={attributes}
                    >
                      <option>--Select an Attribute--</option>
                      <option value={"Color"}>Color</option>
                      <option value={"Storage"}>Storage</option>
                      <option value={"Display"}>Display</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-outline mb-4">
                    <label
                      className="form-label"
                      htmlFor="inputAddAttribute-value"
                    >
                      Value
                    </label>
                    <select
                      id="selectAddAttribute-attribute"
                      className="form-select"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    >
                      <option>--Select an Value--</option>
                      {attributeValues.map((attrValue, index) => (
                        <option key={index} value={attrValue}>
                          {attrValue}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-4">
                  <div className="form-outline mb-2">
                    <label
                      className="form-label"
                      htmlFor="inputAddAttribute-value"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      id="inputAddAttribute-value"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      required
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-outline mb-2">
                    <label
                      className="form-label"
                      htmlFor="inputAddAttribute-value"
                    >
                      Inventory
                    </label>
                    <input
                      type="text"
                      id="inputAddAttribute-value"
                      className="form-control"
                      onChange={(e) => setInventory(e.target.value)}
                      value={inventory}
                      required
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-outline mb-2">
                    <label
                      className="form-label"
                      htmlFor="inputAddAttribute-value"
                    >
                      Taxrate
                    </label>
                    <select
                      id="selectAddAttribute-attribute"
                      className="form-select"
                      onChange={(e) => setTaxrate(e.target.value)}
                      value={taxrate}
                    >
                      <option value={""}>Select an Percentage</option>
                      <option value={"2"}>2%</option>
                      <option value={"5"}>5%</option>
                      <option value={"8"}>8%</option>
                      <option value={"10"}>10%</option>
                      <option value={"12"}>12%</option>
                      <option value={"15"}>15%</option>
                      <option value={"20"}>20%</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddAttribute}>
            Add Attribute
          </Button>
          <Button variant="secondary" onClick={resetForm}>
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
