import React from 'react';

const data = [
  {
    title: '',
    disc: 'Welcome to Picapool! This Privacy Policy governs the manner in which Picapool collects, uses, maintains, and discloses information collected from users (referred to as "you" or "user") of the Picapool mobile application ("App"). This Privacy Policy applies to the App and all products and services offered by Picapool.',
  },
  {
    title: 'What type of Information We Collect',
    disc: 'a. Personal Data: When you use the Picapool App, we may collect certain personal data, such as your email address, device location, and unique identifiers. These are necessary to provide you with accurate notifications of offers created by creators within your specified radius. Rest assured, your location data will be anonymized to protect your privacy.',
  },
  {
    title: '',
    disc: "b. App Permissions: The App may request access to certain device features, including sending notifications and accessing your device's location at all times. Granting these permissions is essential for the proper functioning of the App and to offer you a personalized experience.",
  },
  {
    title: 'Purpose of Data Collection',
    disc: 'Facilitate accurate notifications of offers within your specified radius. Improve the performance and user experience of the App. Monitor the number of users logging in using Google Firebase analytics.',
  },
  {
    title: 'Third-Party Providers',
    disc: 'We utilize Google Firebase analytics to gather insights into user engagement and interactions within the App. Please note that these third-party services may have their own privacy policies, and we recommend reviewing them for further information.',
  },
  {
    title: 'Your Access to and Control Over Your Personal Information',
    disc: ' You can choose not to grant the App certain permissions, but it may impact the functionality and user experience and you can log out or delete your account, which will remove your personal data associated with the App.',
  },
  {
    title: ' Data Security',
    disc: 'The security of your personal information is important to us. We have implemented technical, administrative, and physical security measures to protect your personal data from unauthorized access and improper use.',
  },
  {
    title: ' Data Retention',
    disc: 'We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.',
  },
  {
    title: 'Age Restriction',
    disc: 'The Picapool App is intended for use by individuals aged 3 and above',
  },
  {
    title: 'Applicable Laws and Jurisdiction',
    disc: 'This Privacy Policy shall be governed by and construed in accordance with the laws of India. By using the App, you consent to the exclusive jurisdiction of the courts in India for any disputes arising under or relating to this Privacy Policy.',
  },
];

const privacy = () => {
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="flex flex-col justify-center items-center gap-10 pt-[2rem] pb-[5rem] mx-auto px-4 md:px-0 text-[1.1rem] text-justify w-[80%]">
        <h1 className="text-center text-[2rem] md:text-[3rem] main__font tracking-wider ">
          Privacy Policy
        </h1>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-5 items-center">
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
