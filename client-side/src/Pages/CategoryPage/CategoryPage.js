import React from 'react';
import CategoryCard from '../../Components/CategoryCard';
import './CategoryPage.css';

const Categories = [
    {
        title : 'category 1',
        description : 'description about category 1',
        id : 'id 1'
    },
    {
        title : 'category 2',
        description : 'description about category 2',
        id : 'id 2'
    },
    {
        title : 'category 3',
        description : 'description about category 3',
        id : 'id 3'
    },
    {
        title : 'category 4',
        description : 'description about category 4',
        id : 'id 4'
    },
    {
        title : 'category 5',
        description : 'description about category 5',
        id : 'id 5'
    }
]

export default function CategoryPage() {

    const CategoryComponent = Categories.map((category) =>{
        return(
        <div>
            <CategoryCard title={category.title} description={category.description} id={category.id} key={category.id}/>
        </div>
        );
      });

  return (
    <div className='CategoryConainer'>
        {CategoryComponent}
    </div>
  )
}
