import React from 'react'
import Faqs from './componentsFAQs/Faqs'
import './FAQs.css'

const faqsList = [
  {
    id: 0,
    questionText: 'How do I navigate your website to find recipes?',
    answerText:
      'Our website features a user-friendly interface designed to help you easily navigate through various recipes. You can use the search bar to look for specific recipes, browse through categories such as cuisine type or meal type, or explore our featured recipes on the homepage.',
  },
  {
    id: 1,
    questionText: 'Are your recipes suitable for beginners?',
    answerText:
      'Yes, we have a wide range of recipes suitable for all skill levels, including beginners. Each recipe comes with clear instructions, ingredients list, and often includes tips and tricks to help you through the cooking process.',
  },
  {
    id: 2,
    questionText: 'Do you offer dietary-specific recipes?',
    answerText:
      'Absolutely! We understand that dietary preferences and restrictions vary among individuals. That\'s why we provide a variety of recipes to accommodate different dietary needs, including vegetarian, vegan, gluten-free, dairy-free, low-carb, and more. You can easily filter recipes based on your dietary preferences using our website\'s filters.',
  },
  {
    id: 3,
    questionText: 'Can I submit my own recipes to your website?',
    answerText:
      'At the moment, we do not have a feature for users to submit recipes directly to our website. However, we greatly appreciate your interest and encourage you to share your recipes with us through our social media channels or by contacting us directly. We love hearing from our community and may feature your recipe on our website with proper credit!',
  },
  {
    id: 4,
    questionText: 'Are the ingredients in your recipes easy to find?',
    answerText:
      'We strive to create recipes using ingredients that are commonly found in most grocery stores. However, some recipes may include specialty ingredients, which we will do our best to provide alternatives for whenever possible. Additionally, we often include tips on where to find specific ingredients or how to substitute them if needed.',
  },
  {
    id: 5,
    questionText: 'Do you provide nutritional information for your recipes?',
    answerText:
      'Yes, we understand the importance of knowing the nutritional content of the food you consume. While we aim to provide nutritional information for most of our recipes, please note that these values are approximate and may vary based on factors such as ingredient brands and portion sizes. We recommend consulting with a nutritionist or using a reliable nutritional calculator for precise information.',
  },
  {
    id: 6,
    questionText: 'How can I save or print recipes from your website?',
    answerText:
      'You can easily save your favorite recipes by creating an account on our website and using the "Save Recipe" feature. Additionally, most recipes include a print-friendly option, allowing you to print them out for easy reference in the kitchen.',
  },
  {
    id: 7,
    questionText: 'I have a question about a specific recipe. How can I get help?',
    answerText:
      'If you have any questions about a particular recipe, feel free to leave a comment directly on the recipe page, and our team or community members will do their best to assist you. You can also reach out to us through our contact page, and we\'ll get back to you as soon as possible.',
  },
  {
    id: 8,
    questionText: 'Do you offer cooking tips and techniques?',
    answerText:
      'Absolutely! In addition to recipes, we provide a wealth of cooking tips, techniques, and instructional articles to help you improve your culinary skills and make the most out of your time in the kitchen. Be sure to check out our blog section for informative content regularly.',
  },
  {
    id: 9,
    questionText: 'Is your website mobile-friendly?',
    answerText:
      'Yes, our website is optimized for mobile devices, making it easy for you to access recipes and cooking resources on the go. Whether you\'re using a smartphone or tablet, you can enjoy a seamless browsing experience on our website.',
  },
]

function FAQs() {
    return (
      <div className='faqsdiv' style={{ height: '100vh', width: '100vw' }}>
        <Faqs faqsList={faqsList} /> {/* Pass faqsList as props */}
      </div>
    )
  }
  
export default FAQs
