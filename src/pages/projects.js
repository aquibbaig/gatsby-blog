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
                <h3>IssueFinder</h3>
                <p>IssueFinder was created in 2017 when I was in my second year of Bachelor's. The main idea behind creation of IssueFinder
                    was that sometimes the problems/issues that people face and want to get fixed is not the one which the govt. bodies are acting
                    upon. IssueFinder does much more than that but basically, it provides a transparent stage for people and authorities to add and 
                    solve issues concurrently. The app is currently in development because there are a lot of things which can be worked upon in this
                    area. This app, maybe in development bagged us second prize in Google Developers Hackfest 2017.
                </p>
            </Layout>
        )
    }
}

export default Projects;
