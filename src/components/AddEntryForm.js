import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PostEntry } from "../utils/Api";

const AddEntryForm = ({ location, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
      
    try {
      setIsLoading(true);
      data.Latitude = location.Latitude;
      data.Longitude = location.Longitude;
      PostEntry(data);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
};
    
  return (
    <form className="add-entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className="error">{error}</h3> : null}

      <label htmlFor="title">Title</label>
      <input name="Title" type="text" required ref={register}></input>
      <label htmlFor="Comments">Comments</label>
      <textarea name="Comments" rows="3" type="text" ref={register}></textarea>
      <label htmlFor="Description">Description</label>
      <textarea
        name="Description"
        rows="3"
        type="text"
        ref={register}
      ></textarea>
      <label htmlFor="Rating">Rating:</label>
      <input
        name="Rating"
        type="number"
        max="10"
        min="1"
        ref={register}
      ></input>
      <label htmlFor="Image">Image (URL)</label>
      <input type="text" name="Image" ref={register}></input>
      <label htmlFor="visitDate">Visit Date:</label>
      <input type="date" name="visitDate" required ref={register}></input>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "...Loading" : "Add Entry"}
      </button>
    </form>
  );
};

export default AddEntryForm;
