import React, { Fragment } from 'react'
import { Drawer, Space, Button, Row, Col } from 'antd'
import ActiveDeactiveTag from './ActiveDeactiveTag'
export default function AccountInformationDrawer({recordData,  closeDrawer, drawerOpen}) {
    return (
        <Fragment>

            <Drawer
                title="Account Information"
                placement="top"
                width={500}
                height={1000}
                onClose={closeDrawer}
                visible={drawerOpen}
                extra={
                    <Space>
                        <Button onClick={closeDrawer}>Cancel</Button>
                        <Button type="primary" onClick={closeDrawer}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <div className=''>
                    <div className='space-y-1 text-[#515151]  p-2'>
                        <div className=' md:w-[50%] lg:w-[28%] w-full'>
                            <Row className='text-[#515151] text-md font-semibold capitalize space-y-1'>
                                <Col className='pl-10 ' span={12}>Account Name </Col>
                                <Col span={12}>{recordData.AccountName}</Col>
                                <Col className='pl-10 ' span={12}>Account Type</Col>
                                <Col span={12}>{recordData.AccountType}</Col>
                                <Col className='pl-10 ' span={12}>Account Code</Col>
                                <Col span={12}>{recordData.AccountCode}</Col>
                                <Col className='pl-10 ' span={12}>Account Status</Col>
                                <Col span={12}><ActiveDeactiveTag value={recordData.Active}/></Col>
                                <Col className='pl-10' span={12}>Description</Col>
                                <Col className="lowercase italic" span={12}>lor{recordData.Description}</Col>
                            </Row>
                           
                        </div>
                    </div>
                    <div className='text-gray-400'>
                        content data table
                    </div>
                </div>
            </Drawer>
        </Fragment>
    )
}
