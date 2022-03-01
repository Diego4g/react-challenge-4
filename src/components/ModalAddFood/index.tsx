import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import  Input from '../Input';

interface AddFoodProps {
  id: number;
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
}

export interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: AddFoodProps) => void;
}

function ModalAddFood({ handleAddFood, isOpen, setIsOpen }: ModalAddFoodProps) {
  const formRef = useRef<FormHandles>(null);
  
  const handleSubmit = async (data: AddFoodProps) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );

};

export default ModalAddFood;
