import React from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const DashboardPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
        setUser(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchUser()
  }, [])
  if (!localStorage.getItem('token')) {
    navigate('/login')
      }
      console.log(user)
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>DashboardPage 
      {user && <h1>Welcome, {user.fullName}!</h1>}
    </div>
  )
}

export default DashboardPage