<script setup>
  const faq = [
    {
      question: "What is Protect.com?",
      answer:
        "Protect.com is your one-stop destination for discovering savings on car insurance. We built this site to help people compare different quotes from top providers without having to fill out dozens of forms. We show you providers that we think offer you the lowest rates based on your vehicle and lifecycle, taking the guesswork out of the auto insurance buying process.",
    },
    {
      question: "Why should you use Protect.com?",
      answer: `Protect.com helps take the hard work AND guesswork out of which insurers will be best for you by allowing you to quickly and easily compare quotes online. To help you find a policy that fits your needs, we partner with the nation's top providers, both small and larger, to help scan all the possible discounts you may be eligible for.<span class='d-block my-2'>With Protect.com, you can:</span><ul class='ml-4 mt-2'><li>Save hours by getting multiple car insurance quotes at once Discover YOUR cheapest car insurance rates based on your driving profile</li><li>Learn more about car insurance shopping</li><li>Get assistance from our knowledgeable in-house agents</li><li>Feel confident your personal info is safe and secure</li></ul>`,
    },
    {
      question: "How does Protect.com make money?",
      answer:
        "We are a small team of people who need car insurance just like you! If you purchase a policy through one of our insurance agents, we earn a commission. These commissions allow us to provide our quote services free of charge and keep our site up and running.",
    },
    {
      question: "Is Protect.com an insurance agency?",
      answer:
        "The Protect.com Team is made up of people who want the best-priced car insurance for every American. Protect.com is not an insurance agency, but we work closely with the nation's top providers to make sure our users get quality quotes that's right for their wallets.",
    },
    {
      question: "Is Protect.com a licensed insurance company?",
      answer:
        "We are a team of people passionate about helping Americans find the right-priced insurance. We are not a team of licensed insurance carriers, just enthusiasts of saving money. We work directly with the nation's top licensed insurance agencies to get you quotes.",
    },
    {
      question: "What information do I need to provide to get a free personalized quote?",
      answer:
        "Your privacy is the most important thing. That's why we only collect the minimum information we need to find you accurate car insurance quotes. This includes information about your car such as its make, model, and year. We also ask questions about your lifestyle that may help find you additional discounts. This might include marital status, homeownership, honorably serving in the military, etc. To purchase your policy you'll need your Vehicle Identification Number (VIN) and driver's license number.",
    },
    {
      question: "Does getting an insurance quote impact my credit score?",
      answer: "No. Getting free home insurance, health insurance, or auto insurance quote from Protect.com has no impact on your credit score.",
    },
    {
      question: "How does Protect.com handle the information I submit?",
      answer:
        "We take your privacy seriously. Please review our Privacy Policy and reach out to insuranceinfo@dmsgroup.com for any questions or concerns.",
      links: [
        {
          text: "Privacy Policy",
          destination: "/privacy-policy",
        },
        {
          text: "insuranceinfo@dmsgroup.com",
          destination: "mailto:insuranceinfo@dmsgroup.com",
        },
      ],
    },
    {
      question: "What types of car insurance coverage options can I shop for?",
      answer: `Auto (car) insurance is made up of different coverages designed to financially protect you if you're in an accident and/or your vehicle is damaged. When getting the right coverage for you, keep in mind the cost of the policy and the amount of coverage you want.<span class='d-block my-2'>The six common car insurance coverage types are:</span><ol class='ml-4 mt-2'><li>Auto liability coverage</li><li>Uninsured and underinsured motorist coverage</li><li>Comprehensive coverage</li><li>Collision coverage</li><li>Personal injury protection</li></ol>`,
    },
    {
      question: "What types of homeowners insurance coverage options can I shop for?",
      answer: `There are eight main home insurance policy types to choose from. The type that's best for you depends on multiple factors such as whether you rent or own and the type of home you have.<span class='d-block my-4'>HO-1: The most basic and limited form of homeowners insurance for single-family homes, this type does not include coverage for belongings and is rarely offered by insurers today.</span><span class='d-block my-4'>HO-2: A coverage step up from an HO-1 policy, this policy type does include coverage for belongings, but in general offers fewer financial protections than an HO-3 policy.</span><span class='d-block my-4'>HO-3: The most common homeowners insurance policy for single-family homes, this type offers broader financial protection for your structures and belongings against a wider range of risks.</span><span class='d-block my-4'>HO-4: Commonly referred to as "renters insurance", this policy type covers personal property, liability, and tenant's loss of use.</span><span class='d-block my-4'>HO-5: A highly comprehensive (and usually expensive) policy for single-family homes, this policy type provides the most extensive coverage available.</span><span class='d-block my-4'>HO-6: Designed specifically for condo owners, this policy covers the interior structure from the studs in and personal belongings.</span><span class='d-block my-4'>HO-7: Created for manufactured and mobile home owners, this policy type offers coverage similar to an HO-3 policy but for non-permanent structures.</span><span class='d-block my-4'>HO-8: This is a coverage designed for older or historic homes, this coverage type can step in when the cost to rebuild exceeds the home's market value.</span>`,
    },
  ];
</script>

<template>
  <div>
    <b-container>
      <vertical-card-row
        title="Save hundreds or more on your premiums"
        description="Protect.com users save an average of
              $700 on their car insurance by comparing insurance rates from multiple companies.
              Some drivers can even cut their monthly payment in half by switching carriers while bundling
              home and auto insurance."
        button-destination="insure.protect.com"
        card-image="home-1.png"
        large-col-size="7"
        card-position="left"
        :lazy-image="true"
      />

      <vertical-card-row
        title="The right coverage for every driver"
        description="From first-time drivers to multi-vehicle households, Protect.com digs
        deep to find the best car insurance rates for every life stage and situation. Whether
        you need liability coverage, collision coverage, or full coverage, we'll help you
        find the perfect policy."
        button-destination="insure.protect.com"
        large-col-size="7"
        card-image="home-2.png"
        card-position="right"
        :lazy-image="true"
      />

      <vertical-card-row
        title="Safe, secure, and transparent"
        description="We'll never sell your personal information, and we'll protect it
        as if it were our own. We use real data from licensed insurance agents and carriers,
        customer reviews, and unbiased sources to help you get the complete picture of each
        insurance company and policy."
        button-destination="insure.protect.com"
        card-image="home-3.png"
        large-col-size="7"
        card-position="left"
        :lazy-image="true"
      />
    </b-container>

    <b-container>
      <Faq :faq="faq" />
    </b-container>
  </div>
</template>
