import React from "react";

const data = [
  {
    title: "",
    disc: 'Welcome to Picapool! This Privacy Policy governs the manner in which Picapool collects, uses, maintains, and discloses information collected from users (referred to as "you" or "user") of the Picapool mobile application ("App"). This Privacy Policy applies to the App and all products and services offered by Picapool.',
  },
  {
    title: "What type of Information We Collect",
    disc: "The app uses background location with the - allow all time setting to send accurate offer notifications to users based on their locality.  Our app offers a unique feature that allows users to avail special offers by creating a pool within a specific radius. Here's how it works:",
  },

  {
    title: "",
    disc: "Offer Pool Creation: If a user wishes to take advantage of an offer but requires more participants, they can create an offer pool within a certain radius. Proximity-Based Notifications: Other users of our app, whose latest location falls within the specified radius of the created offer pool, may receive a notification regarding the available offer. This ensures that users receive relevant offer notifications based on their proximity to the pool and the opportunity to participate in the offer. Location Data Usage: In order to facilitate the proximity-based notification system, our app collects and utilizes location data from users.",
  },

  {
    title: "",
    disc: "Rest assured, your location data will be anonymized to protect your privacy.we may also collect certain personal data, such as your email address, and unique identifiers. These are necessary to authenticate and secure your data.The App may request access to certain device features, including sending notifications and accessing your device's location at all times. Granting these permissions is essential for the proper functioning of the App and to offer you a personalized experience.",
  },

  {
    title: "Purpose of Data Collection",
    disc: "Facilitate accurate notifications of offers within your specified radius. Improve the performance and user experience of the App. Monitor the number of users logging in using Google Firebase analytics.",
  },
  {
    title: "Third-Party Providers",
    disc: "We utilize Google Firebase analytics to gather insights into user engagement and interactions within the App. Please note that these third-party services may have their own privacy policies, and we recommend reviewing them for further information.",
  },
  {
    title: "Your Access to and Control Over Your Personal Information",
    disc: " You can choose not to grant the App certain permissions, but it may impact the functionality and user experience and you can log out or delete your account, which will remove your personal data associated with the App.",
  },
  {
    title: " Data Security",
    disc: "The security of your personal information is important to us. We have implemented technical, administrative, and physical security measures to protect your personal data from unauthorized access and improper use.",
  },
  {
    title: " Data Retention",
    disc: "We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.",
  },
  {
    title: "Age Restriction",
    disc: "The Picapool App is intended for use by individuals aged 3 and above",
  },
  {
    title: "Applicable Laws and Jurisdiction",
    disc: "This Privacy Policy shall be governed by and construed in accordance with the laws of India. By using the App, you consent to the exclusive jurisdiction of the courts in India for any disputes arising under or relating to this Privacy Policy.",
  },
];

const privacy = () => {
  return (
    <div className="w-screen">
      <div className="flex flex-col justify-center items-center gap-10 pt-[2rem] pb-[5rem] mx-auto px-4 md:px-0 text-[1.1rem] text-justify w-[80%]">
        <h1 className="text-center text-[2rem] md:text-[3rem] main__font tracking-wider ">
          Privacy Policy
        </h1>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-5 items-start mr-auto">
            <p className="font-bold underline text-[1.15rem] text-justify">
              {item.title}
            </p>
            <p>{item.disc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default privacy;
