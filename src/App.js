import { useState } from 'react';
import './App.css';

async function uploadPhoto(photo) {
  const formData = new FormData();
  formData.append('file', photo)
  const response = await fetch(`http://192.168.0.17:5000/predict`, {method: 'POST', body: formData});
  return await response.json();
}


function App() {

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(evt) {
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await uploadPhoto(evt.target.files[0]);
      setResult(res);
    } catch (error) {
      alert(error);
      setResult(null);
      setError('error uploading picture')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <div className="container">

        {loading && <div className="loading"></div>}

        {result && !loading && (
          <div className="result">
            <img src={`${result.class}.jpeg`} alt={result.class} />
            <div className="result-class">{result.class}</div>
            <div className="result-prob">{Number(result.probability*100).toFixed(2)}%</div>
          </div>
        )}
        {!result && !loading && <div className="error">{error}</div>}

        <input className="btn" type="file" accept="image/*" onChange={handleUpload} />
      </div>

      {/* <button className="btn">Take photo</button> */}
    </div>
  );
}

export default App;
