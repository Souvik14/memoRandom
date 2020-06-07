import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(al => (
    <div key={al.id} className={`alert-${al.alertPos} alert-${al.alertType} alert-${al.alertCon}`}>
        { al.msg }
    </div>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
