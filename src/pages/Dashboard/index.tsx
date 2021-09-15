import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodProps {
  id: number
  name: string
  description: string
  price: number
  available: boolean
  image: string
}

interface Props {
  foods: FoodProps[]
}

interface ModalProps {
  modalState: boolean
}

export function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    const response = api.get('/foods')
    .then(response => setFoods(response.data))
  }, [])

  console.log("teste" + foods)

  function handleAddFood(food: FoodProps) {
    try {
      const response = api.post('/foods', {
        ...food,
        available: true
      })

      const newFood = response

      // setFoodsList({ foods: [ ...foodsList, newFood] })
    } catch (err) {
      console.log(err)
    }
  }

  // handleAddFood = async food => {
  //   const { foods } = this.state;

  //   try {
  //     const response = await api.post('/foods', {
  //       ...food,
  //       available: true,
  //     });

  //     this.setState({ foods: [...foods, response.data] });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // handleUpdateFood = async food => {
  //   const { foods, editingFood } = this.state;

  //   try {
  //     const foodUpdated = await api.put(
  //       `/foods/${editingFood.id}`,
  //       { ...editingFood, ...food },
  //     );

  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );

  //     this.setState({ foods: foodsUpdated });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  function handleDeleteFood(id: number) {
    // const { foods } = this.state;

    // await api.delete(`/foods/${id}`);

    // const foodsFiltered = foods.filter(food => food.id !== id);

    // this.setState({ foods: foodsFiltered });
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  // handleEditFood = food => {
  //   this.setState({ editingFood: food, editModalOpen: true });
  // }

    return (
      <>
        <Header openModal={toggleModal} />
        {/* <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        /> */}

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                // handleDelete={handleDeleteFood}
                // handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }
