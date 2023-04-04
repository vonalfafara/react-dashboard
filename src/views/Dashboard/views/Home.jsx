import { useEffect, useState } from "react"
import { Container, Row, Col, Form, Card } from "react-bootstrap"
import http from "../../../lib/http"
import Chart from 'react-apexcharts'

const Home = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [provinces, setProvinces] = useState([])
  const [totalReportSeries, setTotalReportSeries] = useState([])
  const [totalReportOptions, setTotalReportOptions] = useState({})
  const [reportsOptions, setReportsOptions] = useState({})
  const [reportsSeries, setReportsSeries] = useState([])
  const [date, setDate] = useState(null)

  useEffect(() => {
    async function getCountries() {
      const res = await http.get("/regions")
      const temp = res.data.data.sort((a, b) => {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      })
      setCountries(temp)
    }
    getCountries()
    return
  }, [])

  useEffect(() => {
    async function getProvinces() {
      if (country) {
        const res = await http.get(`/provinces?iso=${country}`)
        setProvinces(res.data.data.filter(province => province.province))
      }
    }
    getProvinces()
    return
  }, [country])

  useEffect(() => {
    async function getTotalReport() {
      console.log(date)
      if (date) {
        const res = await http.get(`/reports/total?date=${date}`)
        const data = res.data.data
        setTotalReportSeries([data.active, data.confirmed, data.deaths, data.recovered])
        setTotalReportOptions({
          labels: ['Active', 'Confirmed', 'Deaths', 'Recovered']
        })
      }
    }
    getTotalReport()
    return
  }, [date])

  useEffect(() => {
    async function getReports() {
      if (date || country) {
        let params = [`date=${date}`, `iso=${country}`]
        params = params.filter(param => !param.includes("null")).join("&")
        const res = await http.get(`/reports?${params}`)
        const data = res.data.data
        console.log(data)
        const active = data.map(record => record.active)
        const confirmed = data.map(record => record.confirmed)
        const deaths = data.map(record => record.deaths)
        const recovered = data.map(record => record.recovered)
        const provinces = data.map(record => record.region.province)

        const series = [
          {
            name: "Active",
            data: active
          },
          {
            name: "Confirmed",
            data: confirmed
          },
          {
            name: "Deaths",
            data: deaths
          },
          {
            name: "Recovered",
            data: recovered
          },
        ]

        const options = {
          chart: {
            type: 'bar',
            height: 350
          },
          xaxis: {
            categories: provinces,
          },
        }

        setReportsSeries(series)
        setReportsOptions(options)
      }
    }
    getReports()
    return
  }, [date, country])

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Form.Select aria-label="Countries" onChange={(e) => setCountry(e.target.value)}>
              {countries.map((country, index) => {
                return (
                  <option value={country.iso} key={index}>{country.name}</option>
                )
              })}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select aria-label="Provinces">
              {provinces.map((province, index) => {
                return (
                  <option value={province.province} key={index}>{province.province}</option>
                )
              })}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control type="date" aria-label="Date" onChange={(e) => setDate(e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Chart options={totalReportOptions} series={totalReportSeries} type="pie" width="500" />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Chart options={reportsOptions} series={reportsSeries} type="bar" />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home