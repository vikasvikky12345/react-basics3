import { useRouter } from 'next/router';

const details = [
  { id: 1, name: 'Yash', role: 'Senior Developer' },
  { id: 2, name: 'Vaibhav', role: 'Backend Developer' },
  { id: 3, name: 'Suresh', role: 'Frontend Developer' },
];

const AboutUs = () => {
  const router = useRouter();
  const { id } = router.query;

  const findMemberById = (id) => {
    return details.find((member) => member.id === parseInt(id));
  };

  const member = findMemberById(id);

  return (
    <div>
      {member ? (
        <div>
          <h1>{member.name}</h1>
          <p>{member.role}</p>
        </div>
      ) : (
        <h1>Developer doesn't exist</h1>
      )}
    </div>
  );
};

export default AboutUs;
