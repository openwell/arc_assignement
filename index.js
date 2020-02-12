const headers = ['SL', 'Date', 'Diagnosis', 'Weight', 'Doctor'];

document.querySelector('#submit-btn').addEventListener('click', async () => {
  const ID = document.querySelector('#patient-select').value;
  if (Number(ID) !== -1) {
    try {
    document.querySelector('#loader-view').style.display = 'block'
    document.querySelector('#profile-view').style.display = 'none'
      const data = await fetch(
        `https://jsonmock.hackerrank.com/api/medical_records?userId=${ID}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        }
      );
      const res = await data.json();
      const res2 = res.data;
      document.querySelector('#patient-name').innerText = res2[0].userName;
      document.querySelector('#patient-dob').innerText = res2[0].userDob;
      document.querySelector('#patient-height').innerText = res2[0].meta.height;
      const th = document.querySelector('#table-header');
      th.innerHTML = `
        <tr>
        <th> SL</th> 
        <th> Date</th>
        <th> Diagnosis</th>
        <th> Weight</th>
        <th> Doctor </th>
        </tr>
        `;
      const td = document.querySelector('#table-body');
        
        for (let i = 0; i < res2.length; i++) {
            td.innerHTML +=`
            <tr>
            <td>${i}</td>
            <td>${new Date(res2[i].timestamp).toLocaleDateString() } </td>
            <td>${res2[i].diagnosis.name} (${res2[i].diagnosis.severity})</td>
            <td>${res2[i].meta.weight}</td>
            <td>${res2[i].doctor.name}</td>
            </tr>
            `
        }
        document.querySelector('#profile-view').style.display = 'block'
        document.querySelector('#loader-view').style.display = 'none'
    } catch (error) {
      throw error;
    }
  }
});

