import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

class Projects extends React.Component{
    render() {
        const siteTitle = "Aquib Baig"
        const location = "/tech"
        return(
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title={siteTitle}
                    keywords={[`blog`, `gatsby`, `javascript`, `react`, `tech`]}
                />
                <Bio />
                <h3>1. LibreCores</h3>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDP-iEYQBI6dXz59OScU64-0n9R18wZGu53qgvEoO_fkGdxdhU"></img><br/>
                LibreCores is my Google Summer of Code project with FOSSi Foundation. LibreCores is your gateway to free and open source digital designs and other components that you can use and re-use in your digital designs. 
                Towards this goal, LibreCores provides you
                a comprehensive and easy directory of digital design components ("IP Cores"),
                means to assess the quality of those components, and
                documentation to learn more about the use and contribution to free and open source digital designs.
                LibreCores is a project of the Free and Open Source Silicon (FOSSi) Foundation, which was created to give a voice to the digital hardware design community. LibreCores, like FOSSi Foundation, is run entirely by volunteers.
                My contribution includes introducing a user notification and feedback mechanism on the website to facilitate user interactivity.
                For more information, go to <a href="https://www.librecores.org">LibreCores website</a>.
                
                <h3>2. IssueFinder</h3>
                IssueFinder was created in 2017 when I was in my second year of Bachelor's. The main idea behind creation of IssueFinder
                    was that sometimes the problems/issues that people face and want to get fixed is not the one which the govt. bodies are acting
                    upon. IssueFinder does much more than that but basically, it provides a transparent stage for people and authorities to add and 
                    solve issues concurrently. The app is currently in development because there are a lot of things which can be worked upon in this
                    area. This app, maybe in development bagged us second prize in Google Developers Hackfest 2017.
                
            </Layout>
        )
    }
}

export default Projects;
