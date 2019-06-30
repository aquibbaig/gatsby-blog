import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

class Tech extends React.Component{
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
                <h3>MacBook Pro 2018</h3>
                <img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/macbookpro/macos-sierra-macbook-pro-touch-bar-animation-hero.gif"></img>
                <p>Sums up most of my work. A really powerful machine which runs on the beautiful MacOS on top. Most of the work I do is web
                    development and this machine handles all of my daily activities really well. P.S. I keep my laptop turned on for about 14
                    hours a day! Most machines become quite slow but not this one!
                </p>
                <h3>Pixel 2 XL</h3>
                <img src="https://cdn.gsmarena.com/imgroot/reviews/17/google-pixel-2/lifestyle/-728w2/gsmarena_012.jpg"></img>
                <p>The best camera phone hands down! Pixel is the best phone for modern usage. The hardware is one of the best in the world.
                    Also, you get about three years of software updates from Google, so why not switch.
                </p>
                <h3>Bose QuiteComfort 35</h3>
                <img src="https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc35_ii/photo_gallery/qc35_ii_product_page_graywolf_google_SC_01.psd/jcr:content/renditions/cq5dam.web.1920.1920.jpeg"></img>
                <p>I'm a big music fan. So what's better than industry-leading noise cancellation offered by Bose. I did try other products in the similar
                    price range which offer maybe more bass but yeah, sound quality has made all the difference in my purchase decision.
                </p>
            </Layout>
        )
    }
}

export default Tech;
