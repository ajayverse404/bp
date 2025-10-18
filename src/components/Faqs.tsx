import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'What age group is Binary Prototypes designed for?',
      answer:
        'Our programs are specifically designed for middle school students (ages 11-14), with curriculum tailored to their developmental stage and learning needs.',
    },
    {
      question: 'Does my child need prior experience?',
      answer:
        'Not at all! We welcome students of all skill levels. Our Beginner program starts with fundamentals, while Advanced programs challenge experienced students.',
    },
    {
      question: 'What will my child learn?',
      answer:
        'Students learn programming fundamentals, engineering principles, critical thinking, and problem-solving through hands-on robotics projects. They also develop teamwork and communication skills.',
    },
    {
      question: 'Where are classes held?',
      answer:
        'Classes will be released soon. Right now, we are focusing on the US East region in the NJ or NY area for in-person events.',
    },
  ],
  [
    {
      question: 'How are classes structured?',
      answer:
        'Classes are hands-on and project-based, with small group instruction to ensure personalized attention. Students work on building and programming robots to solve real-world challenges.',
    },
    {
      question: 'What robotics platforms do you use?',
      answer:
        'We use industry-standard robotics platforms and programming tools that prepare students for competitions and future STEM education.',
    },
    {
      question: 'Do you offer competition opportunities?',
      answer:
        'Yes! Our Intermediate and Advanced programs include competition preparation, and we support teams participating in robotics competitions.',
    },
    {
      question: 'What are the class prerequisites?',
      answer:
        'It is good to have basic fundamentals of coding, but if not, we can help refresh these concepts prior to the robotics class.',
    },
    {
      question: 'Does my student need a laptop?',
      answer:
        'Yes, for trial users we can provide a laptop. However, for actual classes, a Windows, Mac, or Linux laptop is recommended.',
    },
  ],
  [
    {
      question: 'How do I enroll my child?',
      answer:
        'Click the "Enroll Now" button to get started, or contact us directly for enrollment information and to schedule a tour of our facility.',
    },
    {
      question: 'What is the class schedule?',
      answer:
        'We offer flexible scheduling with weekly sessions. Contact us to learn about current class times and availability for your preferred program level.',
    },
    {
      question: 'What is your instructor-to-student ratio?',
      answer:
        'We maintain small class sizes with certified instructors to ensure each student receives personalized guidance and support throughout their learning journey.',
    },
    {
      question: 'Can my student use a Chromebook?',
      answer:
        'No, Chromebooks have challenges with our robotics platform. Please contact us for alternative options.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Have questions about our programs? Here are answers to some common
            questions. Feel free to contact us for more information.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg/7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
