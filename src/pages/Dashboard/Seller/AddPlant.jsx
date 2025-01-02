import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import useAuth from '../../../hooks/useAuth'
import { imageUpload } from '../../../api/utils';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddPlant = () => {

  const {user} = useAuth();
  const [uploadImage, setUploadImage] = useState({image: { name: 'upload button'},});
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();


  const handleSubmit = async e =>{
    e.preventDefault();
    setLoading(true);;

    // const formData = new FormData(e.target);
    // const initialData = Object.fromEntries(formData.entries());
    // console.log(initialData);

    const form = e.target;
    const name = form.name.value;;
    const description = form.description.value;;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    //seller info
    const seller = {
      photo: user?.photoURL,
      name: user?.displayname,
      email: user?.email,
    }

    const plantData = {
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
      seller,
    }

    console.table(plantData);

    //save plant data to db
    try {
      //save plant data to db
      await axiosSecure.post(`/plants`, plantData);
      toast.success('Plant data saved to db');
      console.log('Plant data saved to db');

    } 
    catch (error) {
      console.error(error);}
    finally{
      setLoading(false);  
    }
  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm 
      handleSubmit={handleSubmit} 
      uploadImage={uploadImage}
      setUploadImage={setUploadImage}
      loading={loading}
       />
    </div>
  )
}

export default AddPlant
