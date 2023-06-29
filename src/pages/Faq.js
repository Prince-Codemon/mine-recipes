import React from 'react'

const faq1 = [
  {
    question: "How do I create a recipe on the website?",
    answer:
      " To create a recipe on the website, follow these steps: .Login to your account or sign up if you don't have one.Click on the 'Profile' button. Then click on 'CreateRecipe' button. Fill in the required information for the recipe,such as the title, ingredients, and instructions.Optionally, you can add photos and select a category for therecipe. Once you have filled in all the necessary details,click on the 'Create' button to make your recipe live on thewebsite.",
  },
  {
    question: "Can I edit or delete my recipes after publishing?",
    answer:
      "Yes, you can edit or delete your recipes after publishing them. Simply go to your profile page and find the recipe you want to edit or delete. Click on the appropriate option and follow the instructions to make the desired changes.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login page and click on the 'Forgot Password' link. Enter your email address associated with your account and click on the 'Reset Password' button. You will receive an email with further instructions on how to reset your password.",
  },
  {
    question: "How can I share a recipe with others?",
    answer:
      "To share a recipe with others, follow these steps: Open the recipe you want to share. Click on the 'Share' button. Choose your preferred sharing method, such as  social media, or copying the recipe link. Follow the prompts to share the recipe with your desired audience.",
  },
  {
    question: "Are the recipes on the website categorized?",
    answer:
      "Yes, the recipes on the website are categorized for easier browsing. You can find various categories such as appetizers, main courses, desserts, vegetarian, and more. Simply navigate to the 'Recipes' section and choose the category you are interested in to explore recipes within that category.",
  },
  {
    question: "Can I save recipes as favorites?",
    answer:
      "Yes, you can save recipes as favorites for easy access later. When you are viewing a recipe, click on the 'Save as Favorite' button. The recipe will then be added to your list of favorites, which you can access from your profile page.",
  },

  {
    question: "How do I edit my profile information?",
    answer:
      "To edit your profile information, follow these steps: Log in to your account. Navigate to your profile page. Click on the 'Edit Profile' button. Update the desired information, such as your name, bio, profile picture, or any other fields available. Once you have made the necessary changes, click on the 'Save' button to update your profile.",
  },
  {
    question: "Where can I find the best recipes on the website?",
    answer:
      "To find the best recipes on the website, you can follow these options: Visit the 'Home Page', which features the recipes. Where you can filter recipes according to your preferences.",
  },
  {
    question:
      "How can I contact support if I have further questions or issues?",
    answer:
      "If you have any further questions, issues, or need assistance with our website, you can reach out to me. Simply visit the 'Contact Us' or 'Github' page on our website. I will get back to you as soon as possible.",
  },
  {
    question: "How long does it take for my recipie URL to be crawled by Google?",
    answer:
      "Once you publish your recipie post on our website, it generally takes around 2 to 5 days for Google and other search engines to crawl and index your content. However, please keep in mind that search engine crawling and indexing times can vary, and it may take longer in some cases",
  },
];

const Faq = () => {
  return (
    <section className=" bg-rose-100">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-rose-600">
          Frequently asked questions
        </h2>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          <div>
            {faq1.slice(0, 5).map((f,i) => {
              return (
                <div className="mb-10" key={i}>
                  <h3 className="flex items-center mb-4 text-lg font-medium  text-black">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-rose-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {f.question}
                  </h3>
                  <p className="text-gray-500 ">{f.answer}</p>
                </div>
              );
            })}
          </div>
          <div>
            {faq1.slice(5,10).map((f,i) => {
              return (
                <div className="mb-10" key={i}>
                  <h3 className="flex items-center mb-4 text-lg font-medium  text-black">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-rose-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {f.question}
                  </h3>
                  <p className="text-gray-500 ">{f.answer}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold  text-black">FAQ</h2>
          <p className="mt-4 text-gray-500 ">
            Still have questions?{" "}
            <a
              href="mailto:blogshlog2@gmail.com"
              target="blank"
              rel="noopener"
              className="text-rose-600 hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Faq