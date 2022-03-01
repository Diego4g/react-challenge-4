import { Component, useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import  Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';



interface EditingFoodProps {
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
  id: number;
}

function Dashboard(): JSX.Element {

  const [foods, setFoods] = useState<EditingFoodProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<EditingFoodProps>(
    {} as EditingFoodProps
  );
  useEffect(() => {
    async function getFoods() {
      const response = await api.get("/foods");
      setFoods(response.data);
    }
    getFoods();
  }, []);

  const handleAddFood = async (food: EditingFoodProps) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: EditingFoodProps) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: EditingFoodProps) => {
    setEditModalOpen(true);
    setEditingFood(food);
  };

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
                available={false}
              />
            ))}
        </FoodsContainer>
      </>
    );
};

export default Dashboard;
