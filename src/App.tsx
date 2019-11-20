import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { BehaviorSubject } from 'rxjs'
import './app.scss'
import Footer from './components/Footer/Footer'
import Impressum from './components/Impressum/Impressum'
import Datenschutz from './components/Datenschutz/Datenschutz'
import GalleryComponent from './components/GalleryComponent/GalleryComponent'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import KontaktScreen from './components/KontaktScreen/KontaktScreen'
import Menu from './components/Menu/Menu'
import Page from './components/Page/Page'
import { OpenMenuObservable, useOpenMenu } from './hooks/useOpenGallery'

export const GlobalObservable = new BehaviorSubject({openGallery: true, initHome: false})

const Index = () => {
  return (
    <Page>
      <Home />
      <Footer />
    </Page>
  )
}

const GalleryScreen = () => {
  return (
    <Page>
      <GalleryComponent />
      <Footer />
    </Page>
  )
}

const Kontakt = () => (
  <Page>
    <KontaktScreen />
    <Footer />
    </Page>
)

const ImpressumScreen = () => {
  return (
    <Page>
      <Impressum />
      <Footer />
    </Page>
  )
}

const DatenschutzScreen = () => {
  return (
    <Page>
      <Datenschutz />
      <Footer />
    </Page>
  )

}

const App = () => {
  const [openMenu, setOpenMenu] = useState(false)
  useOpenMenu()

  const toggle = () => {
    setOpenMenu(!openMenu)
    OpenMenuObservable.next(!openMenu)
  }

  const onEnter = () => {
    // console.log('go');
  }

  return (
    <BrowserRouter>
      <div className="app">
        <div className="body">
        <Header toggle={toggle} open={openMenu} />
          <Menu open={openMenu} toggle={toggle} />
            <div className="pages">
              <Route
                render={({ location }) => {
                  const { pathname } = location
                  return (
                    <TransitionGroup>
                      <CSSTransition
                        key={pathname}
                        classNames="page"
                        onEnter={onEnter}
                        timeout={{
                          enter: 500,
                          exit: 500
                        }}
                      >
                        <Route
                          location={location}
                          render={() => (
                            <Switch>
                              <Route exact path="/" component={Index} />
                              <Route path="/gallery" component={GalleryScreen} />
                              <Route path="/kontakt" component={Kontakt} />
                              <Route path="/impressum" component={ImpressumScreen} />
                              <Route path="/datenschutz" component={DatenschutzScreen} />
                            </Switch>
                          )}
                        />
                      </CSSTransition>
                    </TransitionGroup>
                  )
                }}
              />
            </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
