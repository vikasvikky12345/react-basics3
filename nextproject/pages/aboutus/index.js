import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const details = [
  { id: 1, name: 'Yash', role: 'Senior Developer' },
  { id: 2, name: 'Vaibhav', role: 'Backend Developer' },
  { id: 3, name: 'Suresh', role: 'Frontend Developer' },
];

const AboutUs = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isDeveloperDetailsPage, setIsDeveloperDetailsPage] = useState(false);

  useEffect(() => {
    if (id) {
      setIsDeveloperDetailsPage(true);
    }
  }, [id]);

  const handleDeveloperClick = (id) => {
    router.push(`/aboutus/${id}`);
  };

  if (isDeveloperDetailsPage) {
    const selectedDeveloper = details.find((developer) => developer.id === parseInt(id));
    return (
      <div>
        {selectedDeveloper ? (
          <div>
            <h1>{selectedDeveloper.name}</h1>
            <p>{selectedDeveloper.role}</p>
          </div>
        ) : (
          <h1>Developer doesn't exist</h1>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>Developers:</h1>
      {details.map((developer) => (
        <div key={developer.id} onClick={() => handleDeveloperClick(developer.id)}>
          <p>{developer.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
