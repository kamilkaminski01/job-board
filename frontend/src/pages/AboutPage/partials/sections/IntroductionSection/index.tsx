import './style.scss'
import LineSeparator from 'components/atoms/LineSeparator'
import IntroductionStep from 'pages/AboutPage/partials/components/IntroductionStep'
import { PATHS } from 'utils/consts.ts'

const introductionStepsData = [
  {
    title: 'Search for a job that fits you',
    content:
      'Explore a diverse range of IT job opportunities tailored to your skills, experience, ' +
      'and career preferences. Our comprehensive job listings cover various roles, from software ' +
      'development to cybersecurity and beyond. Find the perfect match for your expertise and ' +
      'ambitions.',
    button: {
      text: 'Browse Offers',
      link: PATHS.home
    }
  },
  {
    title: 'Apply for your ideal job',
    content:
      'Submit applications seamlessly and efficiently through our user-friendly platform. Upload ' +
      'your profile, social links, and other relevant information with ease. Our streamlined ' +
      'application process ensures that your profile stands out to potential employers, ' +
      'increasing your chances of landing your dream job.',
    button: {
      text: 'Update Your Profile',
      link: PATHS.settings
    }
  },
  {
    title: 'Get hired in the IT industry!',
    content:
      'Take the next step in your IT career by connecting with leading employers in the industry. ' +
      'Our platform facilitates direct communication between job seekers and employers,' +
      'making it easier for you to showcase your skills and expertise. Build your professional' +
      'network and secure exciting opportunities.',
    button: {
      text: 'View Your Profile',
      link: PATHS.profile
    }
  }
]

const IntroductionSection = () => {
  return (
    <section className="introduction-section">
      <div className="introduction-section__description">
        <h1 className="description__title">Job Board</h1>
        <LineSeparator />
        <p className="description__content">
          Discover exciting opportunities in the Information Technology sector. Our platform
          connects talented professionals with top employers, providing a streamlined process for
          finding and securing your dream IT job.
        </p>
      </div>
      <div className="introduction-section__steps">
        {introductionStepsData.map((stepData, index) => (
          <IntroductionStep
            key={index}
            step={index + 1}
            title={stepData.title}
            content={stepData.content}
            button={stepData.button}
          />
        ))}
      </div>
    </section>
  )
}

export default IntroductionSection
