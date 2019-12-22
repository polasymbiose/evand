import React, { FunctionComponent, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './app.scss'
import Datenschutz from './components/Datenschutz/Datenschutz'
import Footer from './components/Footer/Footer'
import GalleryComponent from './components/GalleryComponent/GalleryComponent'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Impressum from './components/Impressum/Impressum'
import KontaktScreen from './components/KontaktScreen/KontaktScreen'
import Menu from './components/Menu/Menu'
import Page from './components/Page/Page'
import useBodyClass from './hooks/useBodyClass'

const Wrapper: FunctionComponent<any> = ({ children }) => {
  return (
    <Page>
      {children}
      <Footer />
    </Page>
  )
}

const App = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [data, setdata] = useState({})
  const [init, setinit] = useState(false)
  useBodyClass('noscroll', openMenu)

  const toggle = () => {
    setOpenMenu(!openMenu)
  }

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/img.json`)
      .then(async res => {
        const r = await res.json()
        setdata(r)
      })
      .catch(e => console.log('error fetching:', e))
  }, [])

  return (
    <HashRouter>
      <div className="app">
        <div className="body">
          <Header toggle={toggle} open={openMenu} />
          <Menu open={openMenu} toggle={toggle} />
          <Route
            render={({ location }) => {
              const { pathname } = location
              const lowerPath = pathname.split('/')
              return (
                <div
                  className="pages"
                >
                  <TransitionGroup>
                    <CSSTransition
                      key={lowerPath[1]}
                      classNames="page"
                      timeout={{
                        enter: 500,
                        exit: 500
                      }}
                    >
                      <Route
                        location={location}
                        render={() => (
                          <Switch>
                            <Route
                              exact
                              path="/"
                              render={props => (
                                <Wrapper>
                                  <Home {...props} data={data} init={init} setinit={setinit} />
                                </Wrapper>
                              )}
                            />
                            <Route
                              path="/gallery"
                              render={props => (
                                <Wrapper>
                                  <GalleryComponent {...props} data={data} />
                                </Wrapper>
                              )}
                            />
                            <Route
                              path="/kontakt"
                              render={() => (
                                <Wrapper>
                                  <KontaktScreen />
                                </Wrapper>
                              )}
                            />
                            <Route
                              path="/impressum"
                              render={() => (
                                <Wrapper>
                                  <Impressum />
                                </Wrapper>
                              )}
                            />
                            <Route
                              path="/datenschutz"
                              render={() => (
                                <Wrapper>
                                  <Datenschutz />
                                </Wrapper>
                              )}
                            />
                          </Switch>
                        )}
                      />
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              )
            }}
          />
        </div>
      </div>
    </HashRouter>
  )
}

export default App
