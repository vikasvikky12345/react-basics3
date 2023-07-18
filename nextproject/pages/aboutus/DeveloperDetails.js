import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const details = [
  { id: 1, name: 'Yash', role: 'Senior Developer' },
  { id: 2, name: 'Vaibhav', role: 'Backend Developer' },
  { id: 3, name: 'Suresh', role: 'Frontend Developer' },
];

const DeveloperDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [developer, setDeveloper] = useState(null);

  useEffect(() => {
    const selectedDeveloper = details.find((dev) => dev.id === parseInt(id));
    setDeveloper(selectedDeveloper);
  }, [id]);

  if (!developer) {
    return <h1>Developer doesn't exist</h1>;
  }

  return (
    <div>
      <h1>{developer.name}</h1>
      <p>{developer.role}</p>
    </div>
  );
};

export default DeveloperDetails;
