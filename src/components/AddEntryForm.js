import React from "react";
import { useForm } from "react-hook-form";

const AddEntryForm = () => {
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form className="add-entry-form" handleSubmit={onSubmit}>
      <label for="title">Title</label>
      <input name="title" type="text" required ref={register}></input>
      <label for="Comments">Comments</label>
      <textarea name="Comments" rows="3" type="text" ref={register}></textarea>
      <label for="Description">Description</label>
      <textarea
        name="Description"
        rows="3"
        type="text"
        ref={register}
      ></textarea>
      <label for="rating">
        Rating:
      </label>
      <input name="rating" type="number" max="10" min="1" ref={register}></input>
      <label for="Image">Image (URL)</label>
      <input type="text" name="Image" ref={register}></input>
      <label for="visitDate">Visit Date:</label>
      <input type="date" name="visitDate" required ref={register}></input>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddEntryForm;
